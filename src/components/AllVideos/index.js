import React, { useEffect, useContext, useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import axios from "axios";
import { RootContext } from "../../context/RootContext";
import { Link } from "react-router-dom";

function AllVideos({
  setEditId,
  setActiveItem,
  showSingleVideo,
  setShowSingleVideo,
  singleVideo,
  setSingleVideo,
}) {
  const { isLoading, setIsLoading } = useContext(RootContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    await axios.get("/api/videos").then((res) => {
      setVideos(res.data.videos);
    });
    setIsLoading(false);
  };

  const deleteVideo = async (id) => {
    setIsLoading(true);
    await axios.delete(`/api/videos/${id}`).then((res) => {
      fetchVideos();
    });
    setIsLoading(false);
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>All Videos</h1>
      </div>
      <Grid columns={3}>
        <Grid.Row>
          {videos.length > 0 &&
            videos.map((vid) => (
              <Grid.Column key={vid._id} style={{ marginBottom: "30px" }}>
                <Image
                  src="https://iwfstaff.com.au/wp-content/uploads/2017/12/placeholder-image-300x207.png"
                  className="img"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowSingleVideo(true);
                    setSingleVideo(vid);
                  }}
                />
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Link
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {vid.name}
                  </Link>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ textAlign: "center", wordBreak: "break-word" }}>
                    {vid.description}
                  </div>
                  <div
                    class="ui labeled button"
                    onClick={deleteVideo.bind(this, vid._id)}
                  >
                    <button class="ui red button" tabindex="0">
                      <i aria-hidden="true" class="trash icon"></i>
                      Delete
                    </button>
                  </div>
                  <div class="ui labeled button">
                    <button class="ui blue basic button" tabindex="0">
                      <i aria-hidden="true" class="comments icon"></i>
                      Riviews <span>{vid.reviews.length}</span>
                    </button>
                  </div>
                  <div
                    class="ui labeled button"
                    onClick={() => {
                      setEditId(vid._id);
                      setActiveItem("Add Videos");
                    }}
                  >
                    <button class="ui orange basic button" tabindex="0">
                      <i aria-hidden="true" class="edit icon"></i>
                      Edit
                    </button>
                  </div>
                </div>
              </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default AllVideos;
