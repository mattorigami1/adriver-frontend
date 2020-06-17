import React, { useState } from "react";
import { Grid, Menu, Segment, Header, Icon } from "semantic-ui-react";
import AllVideos from "../../components/AllVideos";
import AddVideos from "../../components/AddVideos";
import SingleVideo from "../../components/SingleVideo";

function Home() {
  const [activeItem, setActiveItem] = useState("All Ads");
  const [editId, setEditId] = useState("");
  const [showSingleVideo, setShowSingleVideo] = useState(false);
  const [singleVideo, setSingleVideo] = useState({});

  const handleItemClick = (e, { name }) => {
    if (name === "All Ads") {
      setEditId("");
      setActiveItem(name);
    } else {
      setActiveItem(name);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <Header as="h2" icon>
          <Icon name="settings" />
          Dashboard Settings
          <Header.Subheader>
            Upload Videos, keep record of All Ads.
          </Header.Subheader>
        </Header>
      </div>

      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="All Ads"
              active={activeItem === "All Ads"}
              style={
                activeItem === "All Ads"
                  ? { color: "white", backgroundColor: "gray" }
                  : {}
              }
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Add Ads"
              active={activeItem === "Add Ads"}
              style={
                activeItem === "Add Ads"
                  ? { color: "white", backgroundColor: "gray" }
                  : {}
              }
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {activeItem === "All Ads" && !showSingleVideo && (
              <AllVideos
                setEditId={setEditId}
                setActiveItem={setActiveItem}
                showSingleVideo={showSingleVideo}
                setShowSingleVideo={setShowSingleVideo}
                singleVideo={singleVideo}
                setSingleVideo={setSingleVideo}
              />
            )}
            {activeItem === "All Ads" && showSingleVideo && (
              <SingleVideo
                setShowSingleVideo={setShowSingleVideo}
                singleVideo={singleVideo}
                setSingleVideo={setSingleVideo}
              />
            )}
            {activeItem === "Add Ads" && (
              <AddVideos
                editId={editId}
                setEditId={setEditId}
                setActiveItem={setActiveItem}
              />
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Home;
