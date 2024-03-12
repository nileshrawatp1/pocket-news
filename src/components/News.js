import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [spinnerLoad, setSpinnerLoad] = useState(true)

  const capitalizeFunc = (text) => text.charAt(0).toUpperCase() + text.slice(1);
  // document.title = `${capitalizeFunc(props.category)} - Pocket News`;

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setSpinnerLoad(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setSpinnerLoad(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json()
    props.setProgress(50);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
    console.log("articlesLength", articles.length)
    console.log("totalResults", totalResults)
  };



  return (
    <div>
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        // hasMore={articles.length <= totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {spinnerLoad && <Spinner />}
        <div className="container my-3">
          <h1 className='my-3 text-center'>Pocket News - {capitalizeFunc(props.category)} Headlines</h1>
          <div className="row">
            {
              articles.map((e) => {
                return <div className="col-md-3" key={e.urlToImage || e.url}>
                  <NewsItem title={e.title} description={e.description ? e.description : ''} imageUrl={e.urlToImage || 'https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw'} contentUrl={e.url} publishedAt={e.publishedAt} source={e.source.name} />
                </div>
              })
            }
          </div>
        </div>
      </InfiniteScroll>

    </div >
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
}