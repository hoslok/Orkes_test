import React from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css"

const url ="https://cors-proxy-wild.herokuapp.com/https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page";

export default function App(){
    const [items, setItems] = React.useState([])
    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () =>{
        const response = await fetch(`${url}/${page}`)
        const {nodes} = await response.json()
        setItems([...items, ...nodes])
        setPage(page+1)
    }
    return(
        <div className="container">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map(({ node }, index) => (
          <div key={index} className="list-item">
            <img
              className="item-image"
              src={node.field_photo_image_section}
              alt={node.title}
            />
            <div className="item-details">
              <div className="item-title">{node.title}</div>
              <div className="item-path">
                <b>Path:</b>
                {node.path}
              </div>
              <div className="item-date">
                {new Date(node.last_update).toDateString()}
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}