<template>
  <div id="app">
    <div class="container">
      <header class="header">
        <h1><i class="fas fa-sticky-note"></i> Notes App</h1>
        <p>Organize your thoughts and ideas</p>
      </header>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div v-if="loading" class="loading">
        <i class="fas fa-spinner fa-spin"></i> Loading notes...
      </div>

      <div v-else-if="notes.length === 0" class="empty-state">
        <i class="fas fa-file-alt"></i>
        <h3>No notes yet</h3>
        <p>Create your first note to get started!</p>
      </div>

      <div class="notes-grid">
        <!-- Add Note Card -->
        <div class="add-note-card" @click="openCreateModal">
          <i class="fas fa-plus"></i>
          <span>Add New Note</span>
        </div>

        <!-- Note Cards -->
        <div 
          v-for="note in notes" 
          :key="note._id" 
          class="note-card"
        >
          <h3 class="note-title">{{ note.title }}</h3>
          <p class="note-content">{{ truncateText(note.content, 150) }}</p>
          <div class="note-meta">
            <small>
              <i class="fas fa-clock"></i>
              {{ formatDate(note.updatedAt) }}
            </small>
          </div>
          <div class="note-actions">
            <button 
              class="btn btn-secondary" 
              @click="openEditModal(note)"
            >
              <i class="fas fa-edit"></i> Edit
            </button>
            <button 
              class="btn btn-danger" 
              @click="deleteNote(note._id)"
            >
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Modal for Create/Edit Note -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">
              {{ isEditing ? 'Edit Note' : 'Create New Note' }}
            </h2>
            <button class="close-btn" @click="closeModal">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <form @submit.prevent="saveNote">
            <div class="form-group">
              <label class="form-label" for="title">Title</label>
              <input
                id="title"
                v-model="currentNote.title"
                type="text"
                class="form-input"
                placeholder="Enter note title..."
                required
                maxlength="100"
              >
            </div>

            <div class="form-group">
              <label class="form-label" for="content">Content</label>
              <textarea
                id="content"
                v-model="currentNote.content"
                class="form-input form-textarea"
                placeholder="Write your note content here..."
                required
              ></textarea>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                <i v-if="saving" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-save"></i>
                {{ saving ? 'Saving...' : (isEditing ? 'Update Note' : 'Create Note') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import notesService from './services/notesService.js';

export default {
  name: 'App',
  data() {
    return {
      notes: [],
      showModal: false,
      isEditing: false,
      currentNote: {
        _id: null,
        title: '',
        content: ''
      },
      loading: false,
      saving: false,
      error: null
    };
  },
  async mounted() {
    await this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      try {
        this.loading = true;
        this.error = null;
        this.notes = await notesService.getAllNotes();
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching notes:', error);
      } finally {
        this.loading = false;
      }
    },

    openCreateModal() {
      this.isEditing = false;
      this.currentNote = {
        _id: null,
        title: '',
        content: ''
      };
      this.showModal = true;
    },

    openEditModal(note) {
      this.isEditing = true;
      this.currentNote = {
        _id: note._id,
        title: note.title,
        content: note.content
      };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.isEditing = false;
      this.currentNote = {
        _id: null,
        title: '',
        content: ''
      };
    },

    async saveNote() {
      try {
        this.saving = true;
        this.error = null;

        const noteData = {
          title: this.currentNote.title.trim(),
          content: this.currentNote.content.trim()
        };

        if (this.isEditing) {
          await notesService.updateNote(this.currentNote._id, noteData);
        } else {
          await notesService.createNote(noteData);
        }

        await this.fetchNotes();
        this.closeModal();
      } catch (error) {
        this.error = error.message;
        console.error('Error saving note:', error);
      } finally {
        this.saving = false;
      }
    },

    async deleteNote(noteId) {
      if (!confirm('Are you sure you want to delete this note?')) {
        return;
      }

      try {
        this.error = null;
        await notesService.deleteNote(noteId);
        await this.fetchNotes();
      } catch (error) {
        this.error = error.message;
        console.error('Error deleting note:', error);
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        return 'Today';
      } else if (diffDays === 2) {
        return 'Yesterday';
      } else if (diffDays <= 7) {
        return `${diffDays - 1} days ago`;
      } else {
        return date.toLocaleDateString();
      }
    },

    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength) + '...';
    }
  }
};
</script>