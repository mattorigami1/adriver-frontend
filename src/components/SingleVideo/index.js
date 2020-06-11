import React, { useState } from "react";
import {
  Button,
  Icon,
  Grid,
  Image,
  Message,
  Label,
  Table,
  Form,
  Radio,
} from "semantic-ui-react";
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
import moment from "moment";
import axios from "axios";

function SingleVideo({ setShowSingleVideo, singleVideo, setSingleVideo }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [negativeReview, setNegativeReview] = useState(true);
  const [possitiveReview, setPossitiveReview] = useState(true);
  const [like, setLike] = useState(true);

  const createComment = async () => {
    setIsLoading(true);
    await axios
      .post(`/api/videos/review/${singleVideo._id}`, {
        negative: negativeReview ? "Yes" : "No",
        possitive: possitiveReview ? "Yes" : "No",
        like,
      })
      .then((res) => {
        setSingleVideo(res.data.data);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const handleRegativeChange = () => setNegativeReview(!negativeReview);

  const handlePossitiveChange = () => setPossitiveReview(!possitiveReview);

  const handleLikeChange = () => setLike(!like);

  return (
    <div>
      <Button
        onClick={() => {
          setShowSingleVideo(false);
        }}
      >
        <Icon name="backward" />
        Go Back
      </Button>

      <div>
        <Grid celled>
          <Grid.Column width={4}>
            <Image src={singleVideo.thumbnail_path} />
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              <h3>{singleVideo.name}</h3>
              <p>{singleVideo.description}</p>
            </div>
          </Grid.Column>
          <Grid.Column width={12}>
            <div style={{ width: "100%" }}>
              <Player
                playsInline
                poster="/assets/poster.png"
                src={singleVideo.video_path}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={12}>
            {/* <Form
              onSubmit={createComment}
              className={isLoading ? "loading" : ""}
            >
              <>
                <h5>Possitive Review</h5>
                <Form.Field>
                  <Radio
                    label="Satisfied"
                    name="radioGroup1"
                    value={possitiveReview}
                    checked={possitiveReview}
                    onChange={handlePossitiveChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Informative"
                    name="radioGroup1"
                    value={!possitiveReview}
                    checked={!possitiveReview}
                    onChange={handlePossitiveChange}
                  />
                </Form.Field>

                <h5>Negative Review</h5>
                <Form.Field>
                  <Radio
                    label="Hight Budgeted"
                    name="radioGroup"
                    value={negativeReview}
                    checked={negativeReview}
                    onChange={handleRegativeChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Discusting"
                    name="radioGroup"
                    value={!negativeReview}
                    checked={!negativeReview}
                    onChange={handleRegativeChange}
                  />
                </Form.Field>
                <h5>Like</h5>
                <Form.Field>
                  <Radio
                    label="Yes"
                    name="radioGroup2"
                    value={like}
                    checked={like}
                    onChange={handleLikeChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="No"
                    name="radioGroup2"
                    value={!like}
                    checked={!like}
                    onChange={handleLikeChange}
                  />
                </Form.Field>
                <Button type="submit" color="teal" style={{ float: "right" }}>
                  Submit
                </Button>
              </>
            </Form> */}
            <h2>Reviews</h2>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Negative</Table.HeaderCell>
                  <Table.HeaderCell>Possitive</Table.HeaderCell>
                  <Table.HeaderCell>Like</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {singleVideo.reviews.length > 0 ? (
                  singleVideo.reviews.map((item) => (
                    <Table.Row>
                      <Table.Cell>
                        <Label>{item.negative}</Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Label>{item.possitive}</Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Label>{item.like ? "Liked" : "Disliked"}</Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Label>{moment(item.date, "YYYYMMDD").fromNow()}</Label>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell>
                      <Label>No Reviews</Label>
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}

export default SingleVideo;
