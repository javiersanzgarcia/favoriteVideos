import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { IVideo } from './Video'
import * as videoService from './VideoService'
import { toast } from 'react-toastify'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
    id: string
}

const VideoForm = () => {
    const initialState = {
        title: '',
        description: '',
        url: '',
    }

    const history = useHistory()
    const params = useParams<Params>()

    const [video, setVideo] = useState<IVideo>({
        title: '',
        description: '',
        url: '',
    })

    const handleInputChange = (e: InputChange) => {
        setVideo({ ...video, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!params.id) {
            await videoService.createVideo(video)
            toast.success('New video added')
            setVideo(initialState)
        } else {
            await videoService.updateVideo(params.id, video)
            toast.success('Video updated')
            setVideo(initialState)
        }

        history.push('/favoriteVideos/')
    }

    const getVideo = async (id: string) => {
        const res = await videoService.getVideo(id)
        const { title, description, url } = res.data
        setVideo({ title, description, url })
    }

    useEffect(() => {
        if (params.id) getVideo(params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>New Video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Write a title for this video"
                                    className="form-control"
                                    autoFocus
                                    onChange={handleInputChange}
                                    value={video.title}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="url"
                                    placeholder="https://somesite.com"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.url}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    rows={3}
                                    placeholder="Write a description"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.description}
                                />
                            </div>

                            {params.id ? (
                                <button className="btn btn-info">
                                    Update Video
                                </button>
                            ) : (
                                <button className="btn btn-primary">
                                    Create Video
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoForm
