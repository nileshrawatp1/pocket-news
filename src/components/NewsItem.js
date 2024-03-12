import React from 'react'

export default function NewsItem (props) {

  const openNewstab = () => {
    window.open(props.contentUrl, '_blank', 'noopener,noreferrer');
  }

    let { title, description, imageUrl, contentUrl, publishedAt, source } = props;
    return (
      <div>
        <div className="container">
          <div className="card my-2"  >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '80%', zIndex: 1}}>
            {source}
          </span>
            <div className="card-body">
              <img src={imageUrl} className="card-img-top" alt="..." style={{ height: "200px" }} onClick={openNewstab} />
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={contentUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
              <p className="card-text mt-3 float-end"><small className="text-muted">{new Date(publishedAt).toGMTString()}</small></p>
            </div>
          </div>
        </div>
      </div>
    )
}
