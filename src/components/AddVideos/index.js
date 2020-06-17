import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Grid, Radio } from "semantic-ui-react";
import axios from "axios";
import { RootContext } from "../../context/RootContext";
import { toast } from "react-toastify";
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

function AddVideos({ editId, setEditId, setActiveItem }) {
  const [videoName, setVideoName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(0);
  const [created, setCreated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [editedVideo, setEditedVideo] = useState("");
  const [editedImage, setEditedImage] = useState("");

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
      setEditedVideo(res.data.data.video_path);
      setEditedImage(res.data.data.thumbnail_path);
    });
    setIsLoading(false);
  };

  const onFileUpload = () => {};

  const onSubmit = async (event) => {
    event.preventDefault();

    if (videoName === "") {
      toast.error("Please Select a video name ");
      return false;
    }

    if (!selectedVideo) {
      toast.error("Please Select a video ");
      return false;
    }
    if (!selectedImage) {
      toast.error("Please Select an image ");
      return false;
    }

    if (description === "") {
      toast.error("Please Select a video description ");
      return false;
    }

    const data = new FormData();
    data.append("video", selectedVideo, selectedVideo.name);
    data.append("video", selectedImage, selectedImage.name);
    data.append("name", videoName);
    data.append("description", description);

    if (navigator.onLine) {
      setIsLoading(true);

      await axios
        .post("/api/videos", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
          onUploadProgress: (progressEvent) => {
            let percent = parseInt(
              Math.round(progressEvent.loaded / progressEvent.total) * 100
            );
            console.log("Percentage => ", percent);
            setProgress(percent);
          },
        })
        .then((res) => {
          toast.success("Ad Uploaded Successfully");
        })
        .catch((err) => {
          toast.error("Problem in uploading your AD");
        });

      setIsLoading(false);
      setActiveItem("All Ads");
    } else {
      toast.warning("No Internet Connection");
      return false;
    }
  };

  const onUpdate = async () => {
    if (videoName === "") {
      toast.error("Please Select a video name ");
      return false;
    }

    if (description === "") {
      toast.error("Please Select a video description ");
      return false;
    }

    if (selectedImage === null && selectedVideo === null) {
      if (navigator.onLine) {
        setIsLoading(true);
        await axios
          .put(
            `/api/videos/without/${editId}`,
            {
              name: videoName,
              description: description,
            },
            {
              onUploadProgress: (progressEvent) => {
                let percent = parseInt(
                  Math.round(progressEvent.loaded / progressEvent.total) * 100
                );
                console.log("Percentage => ", percent);
                setProgress(percent);
              },
            }
          )
          .then((res) => {
            toast.success("Ad Updated Successfully");
          });
        setIsLoading(false);
        setEditId("");
        setActiveItem("All Ads");
      } else {
        toast.warning("No Internet Connection");
        return false;
      }
    } else if (selectedImage === null) {
      const data = new FormData();
      data.append("video", selectedVideo, selectedVideo.name);
      data.append("name", videoName);
      data.append("description", description);

      if (navigator.onLine) {
        setIsLoading(true);
        await axios
          .put(`/api/videos/withVideo/${editId}`, data, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            },
            onUploadProgress: (progressEvent) => {
              let percent = parseInt(
                Math.round(progressEvent.loaded / progressEvent.total) * 100
              );
              console.log("Percentage => ", percent);
              setProgress(percent);
            },
          })
          .then((res) => {
            toast.success("Ad Updated Successfully");
          });
        setIsLoading(false);
        setEditId("");
        setActiveItem("All Ads");
      } else {
        toast.warning("No Internet Connection");
        return false;
      }
    } else if (selectedVideo === null) {
      const data = new FormData();
      data.append("video", selectedImage, selectedImage.name);
      data.append("name", videoName);
      data.append("description", description);

      if (navigator.onLine) {
        setIsLoading(true);
        await axios
          .put(`/api/videos/withImage/${editId}`, data, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            },
            onUploadProgress: (progressEvent) => {
              let percent = parseInt(
                Math.round(progressEvent.loaded / progressEvent.total) * 100
              );
              console.log("Percentage => ", percent);
              setProgress(percent);
            },
          })
          .then((res) => {
            toast.success("Ad Updated Successfully");
          });
        setIsLoading(false);
        setEditId("");
        setActiveItem("All Ads");
      } else {
        toast.warning("No Internet Connection");
        return false;
      }
    } else {
      const data = new FormData();
      data.append("video", selectedVideo, selectedVideo.name);
      data.append("video", selectedImage, selectedImage.name);
      data.append("name", videoName);
      data.append("description", description);

      if (navigator.onLine) {
        setIsLoading(true);
        await axios
          .put(`/api/videos/${editId}`, data, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            },
            onUploadProgress: (progressEvent) => {
              let percent = parseInt(
                Math.round(progressEvent.loaded / progressEvent.total) * 100
              );
              console.log("Percentage => ", percent);
              setProgress(percent);
            },
          })
          .then((res) => {
            toast.success("Ad Updated Successfully");
          });
        setIsLoading(false);
        setEditId("");
        setActiveItem("All Ads");
      } else {
        toast.warning("No Internet Connection");
        return false;
      }
    }
  };

  return (
    <>
      {/* {progress !== 0 && (
        <h1 style={{ position: "fixed", bottom: "0", left: "0" }}>
          Uploading {progress}%
        </h1>
      )} */}

      <div style={{ textAlign: "center" }}>
        <h1>Upload AD</h1>
      </div>

      <Form
        onSubmit={editId ? onUpdate : onSubmit}
        noValidate
        className={isLoading ? "loading" : ""}
        style={{ marginTop: "20px" }}
      >
        <Form.Input
          label="Video Name"
          placeholder="Video Name..."
          name="name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
        />

        <Grid.Row columns={2}>
          <Grid.Column>
            <label style={{ fontSize: ".92857143em", fontWeight: "700" }}>
              Select Video
            </label>
            <input
              type="file"
              name="file-video"
              accept="video/*"
              onChange={fileChangeHander}
              style={{ marginBottom: "10px" }}
            />
            {editId && (
              <div style={{ width: "25%" }}>
                <Player
                  playsInline
                  poster={editedImage}
                  style={{ width: "100px" }}
                  src={editedVideo}
                />
              </div>
            )}
          </Grid.Column>
          <Grid.Column>
            <label style={{ fontSize: ".92857143em", fontWeight: "700" }}>
              Select Image
            </label>
            <input type="file" name="file-image" onChange={fileChangeHander} />
            {editId && <img style={{ width: "25%" }} src={editedImage} />}
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
            <p>Go to all Ads to show Ads</p>
          </div>
        )}
      </Form>
    </>
  );
}

export default AddVideos;
