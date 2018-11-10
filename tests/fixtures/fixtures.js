import moment from 'moment';

export const notes = [
  {
    _id: 'noteId1',
    title: "Note1",
    body: "Body1",
    userId: "UserId1",
    updatedAt: moment().valueOf()
  },
  {
    _id: 'noteId2',
    title: "",
    body: "Body2",
    userId: "UserId2",
    updatedAt: moment().valueOf()
  }
];