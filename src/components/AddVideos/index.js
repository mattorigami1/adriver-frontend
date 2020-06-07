import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import axios from "axios";
import { RootContext } from "../../context/RootContext";

function AddVideos({ editId, setEditId, setActiveItem }) {
  const [videoName, setVideoName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(0);
  const [created, setCreated] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fileChangeHander = (event) => {
    const files = event.target.files[0];
    if (event.target.name === "file-image") {
      setSelectedImage(files);
    } else {
      setSelectedVideo(files);
    }
    setLoaded(0);
  };

  useEffect(() => {
    if (editId) {
      getEditedVideo();
    }
  }, [editId]);

  const getEditedVideo = async () => {
    setIsLoading(true);
    await axios.get(`/api/videos/${editId}`).then((res) => {
      setVideoName(res.data.data.name);
      setDescription(res.data.data.description);
    });
    setIsLoading(false);
  };

  // const setFormData = async () => {
  //   const data = new FormData();

  //   data.append("name", videoName);
  //   data.append("description", description);
  //   data.append("video", selectedVideo);
  //   data.append("image", selectedImage);

  //   return data;
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    // Upload Video Info here

    // const data = await setFormData();

    const data = {
      name: videoName,
      description,
    };

    setIsLoading(true);

    await axios
      .post(
        "/api/videos",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          onUploadProgress: (ProgressEvent) => {
            setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
          },
        }
      )
      .then((res) => {
        console.log("Upload Successful", res.data);
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(`Upload Fail with status: ${err.statusText}`);
      });
    setIsLoading(false);
    setActiveItem("All Videos");
  };

  const onUpdate = async () => {
    setIsLoading(true);
    await axios
      .put(`/api/videos/${editId}`, {
        name: videoName,
        description: description,
      })
      .then((res) => {
        console.log("Updated result => ", res.data.data);
      });
    setIsLoading(false);
    setEditId("");
    setActiveItem("All Videos");
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Upload Video</h1>
      </div>

      <Form
        onSubmit={editId ? onUpdate : onSubmit}
        noValidate
        className={isLoading ? "loading" : ""}
      >
        <Form.Input
          label="Video Name"
          placeholder="Video Name..."
          name="name"
          error={errors.name ? true : false}
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
        />

        <Grid.Row columns={2}>
          <Grid.Column>
            <input
              type="file"
              name="file-video"
              accept="video/*"
              onChange={fileChangeHander}
            />
          </Grid.Column>
          <Grid.Column>
            <input type="file" name="file-image" onChange={fileChangeHander} />
          </Grid.Column>
        </Grid.Row>

        <Form.TextArea
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          label="Description"
          placeholder="Tell something about uploaded video..."
        />
        <Button type="submit" primary style={{ width: "100%" }}>
          Submit Video
        </Button>
        {created && (
          <div class="ui info message">
            <div class="header">Video Uploaded Successfuly</div>
            <p>Go to all videos to show videos</p>
          </div>
        )}
      </Form>
    </>
  );
}

export default AddVideos;
