import React from 'react'
import { IVideo } from './Video'
import ReactPlayer from 'react-player'

import './VideoItem.css'
import { useHistory } from 'react-router-dom'
import * as videoService from './VideoService'

interface IProps {
    video: IVideo
    loadVideos: () => void
}

export const VideoItem = ({ video, loadVideos }: IProps) => {
    const history = useHistory()

    const handleDelete = async (id: string) => {
        await videoService.deleteVideo(id)
        loadVideos()
    }

    return (
        <div className="col-md-4">
            <div
                className="card card-body video-card"
                style={{ cursor: 'pointer' }}
            >
                <div className="d-flex justify-content-between">
                    <h2 onClick={() => history.push(`/update/${video._id}`)}>
                        {video.title}
                    </h2>
                    <span
                        className="text-danger"
                        onClick={() => video._id && handleDelete(video._id)}
                    >
                        X
                    </span>
                </div>
                <p>{video.description}</p>
                <div className="embed-responsive embed-responsive-16by9">
                    <ReactPlayer url={video.url} />
                </div>
            </div>
        </div>
    )
}
