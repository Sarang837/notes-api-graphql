const Note = require('../../models/Note');
const User = require('../../models/User');

const notes = noteIds => {
    return Note.find({_id: {$in: noteIds}})
    .then(notes => {
      return notes.map(result => {
        return {
          ...result._doc,
            user: user.bind(this, result._doc.user),
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString()
        };
      });
    })
    .catch(err => {
      throw err;
    });
  }
  
  const user = userId => {
    return User.findById(userId)
    .then(user => {
      if(!user) {
        throw new Error('User does not exist')
      }
      return {
        ...user._doc,
        notes: notes.bind(this, user._doc.notes)
      };
    })
    .catch(err => {
      throw err;
    });
  }

exports.notes = notes;
exports.user = user;