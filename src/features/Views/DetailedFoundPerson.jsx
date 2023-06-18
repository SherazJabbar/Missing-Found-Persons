import React from "react";
import { Button, Icon, Image, Label, Modal, List } from "semantic-ui-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function DetailedMissingPersonPage({
  open,
  setOpen,
  history,
  event,
  isPost,
}) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>
        Found Person Details<h5>PostedBy: {event.postedBy}</h5>
      </Modal.Header>

      <Modal.Content image scrolling>
        <Image size="large" src={event.mediaUrl} wrapped bordered />

        <Modal.Description>
          <List divided selection>
            <List.Item>
              <Label horizontal>Name:</Label>
              <List.Content floated="right">{event.name}</List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>NickName:</Label>
              <List.Content floated="right">{event.nickName}</List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>Approximate Age:</Label>
              <List.Content floated="right">{event.age}</List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>Gender:</Label>
              <List.Content floated="right">{event.gender}</List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>Found On:</Label>
              <List.Content floated="right">
                {format(event.dateFound, "MMM d, yyyy h:mm a")}
              </List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>Address:</Label>
              <List.Content floated="right">
                {event.location.slice(0, 40)}
              </List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>City:</Label>
              <List.Content floated="right">{event.city}</List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>Height:</Label>
              <List.Content floated="right">{event.height}</List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>Weight:</Label>
              <List.Content floated="right">{event.weight}</List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>PhysicalAppearence:</Label>
              <List.Content floated="right">
                {event.physicalAppearence}
              </List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>Description:</Label>
              <List.Content floated="right">{event.description}</List.Content>
            </List.Item>
            <List.Item>
              <Label horizontal>Weight:</Label>
              <List.Content floated="right">{event.weight}</List.Content>
            </List.Item>
          </List>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button as={Link} to={`/profile/${event.ownerId}`} primary>
          Back To Profile
          <Icon name="chevron right" />
        </Button>
        {isPost && (
          <>
            <Button as={Link} to={`/editFoundPerson/${event.id}`} color="teal">
              <Icon name="edit" />
              Edit
            </Button>
            <Button>
              <Icon name="delete" />
              Delete
            </Button>
          </>
        )}
      </Modal.Actions>
    </Modal>
  );
}
