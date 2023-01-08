const Note = require('../../models/Note');
const User = require('../../models/User');
const { user } = require('./merge');
const { dateToString } = require('../../helpers/date');

const transformNote = note => {
    return {
        ...note._doc,
        user: user.bind(this, note._doc.user),
        createdAt: dateToString(note._doc.createdAt),
        updatedAt: dateToString(note._doc.updatedAt)
    };
}

module.exports = {
    notes: () => {
      return Note
      .find()
      .then(notes => {
        return notes.map(note => {
          return transformNote(note);
        });
      })
      .catch(err => {
        throw err;
      })
    },
    note: (args) => {
      return Note.findById(args.id)
      .then(note => {
        if(!note) {
          throw new Error("No note found");
        }
        return transformNote(note);
      })
      .catch(err => {
        throw err;
      });
    },
    createNote: (args, req) => {
      if(!req.isAuth) {
        throw new Error("Unauthorized");
      }
      note = new Note({
        title: args.noteInput.title,
        content: args.noteInput.content,
        user: '63b90a062d7c26ca9de9df65'
      });
      let createdNote;
      return note
      .save()
      .then(result => {
        createdNote = transformNote(result);
        return User.findById('63b90a062d7c26ca9de9df65')
      })
      .then(user => {
        if(!user)
          throw new Error("User does not exist");
        
        user.notes.push(note)
        return user.save()
      })
      .then(result => {
        return createdNote;
      })
      .catch(err => {
        throw err;
      });
    },
    deleteNote: (args, req) => {
      if(!req.isAuth) {
        throw new Error("Unauthorized");
      }
        let deletedNote;
        return Note.findById(args.id)
        .populate('user')
        .then(note => {
            deletedNote = transformNote(note);
            return Note.deleteOne({ _id: args.id })
        })
        .then(result => {
            return deletedNote;
        })
        .catch(err => {
            throw err;
        });
    }
  };