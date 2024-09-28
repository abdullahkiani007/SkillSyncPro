import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card, CardContent, Typography, TextField, Button, IconButton, Select, MenuItem
} from '@mui/material';
import { AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai';
import { FiLock, FiUnlock } from 'react-icons/fi';
import employerApi from '../../../../API/employer';

const JobNotes = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authorFilter, setAuthorFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Sorting by date
  const [expandedNotes, setExpandedNotes] = useState({}); // Track expanded notes

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await employerApi.getNotesForJob(id);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  // Handle note creation
  const handleCreateNote = async () => {
    if (!newNote) return;
    try {
      const response = await employerApi.createJobNote({ jobId: id, text: newNote, isPrivate });
      setNotes([...notes, response.data]);
      setNewNote('');
      setIsPrivate(false);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Handle note deletion
  const handleDeleteNote = async (noteId) => {
    try {
      await employerApi.deleteNote(noteId);
      setNotes(notes.filter((note) => note._id !== noteId));
      const newExpandedNotes = { ...expandedNotes };
      delete newExpandedNotes[noteId]; // Reset expanded state if note is deleted
      setExpandedNotes(newExpandedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Filter notes by author
  const filteredNotes = notes.filter(note => 
    authorFilter ? note.author?.firstName === authorFilter : true
  );

  // Sort notes by date
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    return sortOrder === 'asc' 
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Toggle expanded state for notes
  const toggleExpand = (noteId) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 via-indigo-50 to-purple-50 shadow-lg rounded-lg w-full mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Job Notes</h2>

      {/* Add Note Section */}
      <div className="bg-white p-6 rounded-xl mx-auto shadow-lg mb-10 max-w-4xl">
        <div className="flex items-center space-x-4">
          <AiOutlineFileAdd size={32} className="text-blue-600" />
          <TextField
            label="Add a new note"
            variant="outlined"
            fullWidth
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </div>

        {/* Private note checkbox */}
        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
          />
          <label className="text-gray-600 text-lg font-medium">Private Note</label>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNote}
          className="mt-6 w-full"
        >
          Add Note
        </Button>
      </div>

      {/* Filter and Sorting */}
      <div className="flex justify-between mb-6 max-w-4xl mx-auto">
        {/* Filter by Author */}
        <Select
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          displayEmpty
          variant="outlined"
          fullWidth
        >
          <MenuItem value="">All Authors</MenuItem>
          {notes.map(note => (
            <MenuItem key={note._id} value={note.author?.firstName}>
              {note.author?.firstName} {note.author?.lastName}
            </MenuItem>
          ))}
        </Select>

        {/* Sort by Date */}
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="desc">Newest First</MenuItem>
          <MenuItem value="asc">Oldest First</MenuItem>
        </Select>
      </div>

      {/* Notes List */}
      {loading ? (
        <Typography variant="h6" align="center">Loading notes...</Typography>
      ) : sortedNotes.length === 0 ? (
        <Typography variant="h6" align="center">No notes for this job yet.</Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-w-4xl max-w-fit mx-auto">
          {sortedNotes.map(note => (
            <Card key={note._id} variant="outlined" className="shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
              <CardContent>
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <Typography variant="h6" component="h2">
                      {expandedNotes[note._id] ? note.text : `${note.text.slice(0, 100)}...`}
                    </Typography>
                    <Button 
                      onClick={() => toggleExpand(note._id)} 
                      variant="text" 
                      color="primary" 
                      style={{ textTransform: 'none', padding: 0, marginTop: '0.5rem' }}>
                      {expandedNotes[note._id] ? 'Read Less' : 'Read More'}
                    </Button>
                  </div>
                  <div className="flex items-center">
                    {note.isPrivate ? <FiLock className="text-red-500" /> : <FiUnlock className="text-blue-500" />}
                    <IconButton onClick={() => handleDeleteNote(note._id)}>
                      <AiOutlineDelete color="red" />
                    </IconButton>
                  </div>
                </div>
                <Typography variant="body2" color="textSecondary">
                  Created by: {note.author?.firstName} {note.author?.lastName}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobNotes;
