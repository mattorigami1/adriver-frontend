import React, { useState } from "react";
import { Grid, Menu, Segment, Header, Icon } from "semantic-ui-react";
import AllVideos from "../../components/AllVideos";
import AddVideos from "../../components/AddVideos";
import SingleVideo from "../../components/SingleVideo";

function Home() {
  const [activeItem, setActiveItem] = useState("All Videos");
  const [editId, setEditId] = useState("");
  const [showSingleVideo, setShowSingleVideo] = useState(false);
  const [singleVideo, setSingleVideo] = useState({});

  const handleItemClick = (e, { name }) => {
    if (name === "All Videos") {
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
            Upload Videos, keep record of All Videos.
          </Header.Subheader>
        </Header>
      </div>

      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="All Videos"
              active={activeItem === "All Videos"}
              style={
                activeItem === "All Videos"
                  ? { color: "white", backgroundColor: "gray" }
                  : {}
              }
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Add Videos"
              active={activeItem === "Add Videos"}
              style={
                activeItem === "Add Videos"
                  ? { color: "white", backgroundColor: "gray" }
                  : {}
              }
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {activeItem === "All Videos" && !showSingleVideo && (
              <AllVideos
                setEditId={setEditId}
                setActiveItem={setActiveItem}
                showSingleVideo={showSingleVideo}
                setShowSingleVideo={setShowSingleVideo}
                singleVideo={singleVideo}
                setSingleVideo={setSingleVideo}
              />
            )}
            {activeItem === "All Videos" && showSingleVideo && (
              <SingleVideo
                setShowSingleVideo={setShowSingleVideo}
                singleVideo={singleVideo}
                setSingleVideo={setSingleVideo}
              />
            )}
            {activeItem === "Add Videos" && (
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
