<template>
  <div id="app">
    <header class="header">
      <h1>📝 My Notes</h1>
      <button @click="showCreateModal = true" class="btn btn-primary">
        + New Note
      </button>
    </header>

    <main class="main">
      <div v-if="loading" class="loading">Loading notes...</div>
      
      <div v-else-if="notes.length === 0" class="empty-state">
        <p>No notes yet. Create your first note!</p>
      </div>
      
      <div v-else class="notes-grid">
        <div 
          v-for="note in notes" 
          :key="note._id" 
          class="note-card"
          @click="selectNote(note)"
        >
          <h3>{{ note.title }}</h3>
          <p>{{ truncateContent(note.content) }}</p>
          <div class="note-meta">
            <small>{{ formatDate(note.updatedAt) }}</small>
            <div class="note-actions">
              <button @click.stop="editNote(note)" class="btn-icon" title="Edit">
                ✏️
              </button>
              <button @click.stop="deleteNote(note._id)" class="btn-icon" title="Delete">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ showEditModal ? 'Edit Note' : 'Create New Note' }}</h2>
          <button @click="closeModal" class="btn-close">×</button>
        </div>
        
        <form @submit.prevent="saveNote" class="modal-body">
          <div class="form-group">
            <label for="title">Title:</label>
            <input 
              id="title"
              v-model="form.title" 
              type="text" 
              required 
              placeholder="Enter note title..."
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="content">Content:</label>
            <textarea 
              id="content"
              v-model="form.content" 
              required 
              placeholder="Write your note here..."
              rows="10"
              class="form-textarea"
            ></textarea>
          </div>
          
          <div class="modal-footer">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? 'Saving...' : (showEditModal ? 'Update' : 'Create') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal && selectedNote" class="modal-overlay" @click="closeModal">
      <div class="modal modal-large" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedNote.title }}</h2>
          <div class="modal-header-actions">
            <button @click="editNote(selectedNote)" class="btn btn-secondary">
              ✏️ Edit
            </button>
            <button @click="closeModal" class="btn-close">×</button>
          </div>
        </div>
        
        <div class="modal-body">
          <div class="note-content">{{ selectedNote.content }}</div>
          <div class="note-dates">
            <small>Created: {{ formatDate(selectedNote.createdAt) }}</small>
            <small>Updated: {{ formatDate(selectedNote.updatedAt) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      notes: [],
      loading: true,
      saving: false,
      showCreateModal: false,
      showEditModal: false,
      showViewModal: false,
      selectedNote: null,
      form: {
        title: '',
        content: ''
      }
    }
  },
  
  async mounted() {
    await this.fetchNotes()
  },
  
  methods: {
    async fetchNotes() {
      try {
        this.loading = true
        const response = await axios.get('/api/notes')
        this.notes = response.data
      } catch (error) {
        console.error('Error fetching notes:', error)
        alert('Failed to load notes')
      } finally {
        this.loading = false
      }
    },
    
    async saveNote() {
      try {
        this.saving = true
        
        if (this.showEditModal) {
          // Update existing note
          await axios.put(`/api/notes/${this.selectedNote._id}`, this.form)
        } else {
          // Create new note
          await axios.post('/api/notes', this.form)
        }
        
        await this.fetchNotes()
        this.closeModal()
      } catch (error) {
        console.error('Error saving note:', error)
        alert('Failed to save note')
      } finally {
        this.saving = false
      }
    },
    
    async deleteNote(id) {
      if (!confirm('Are you sure you want to delete this note?')) {
        return
      }
      
      try {
        await axios.delete(`/api/notes/${id}`)
        await this.fetchNotes()
      } catch (error) {
        console.error('Error deleting note:', error)
        alert('Failed to delete note')
      }
    },
    
    selectNote(note) {
      this.selectedNote = note
      this.showViewModal = true
    },
    
    editNote(note) {
      this.selectedNote = note
      this.form = {
        title: note.title,
        content: note.content
      }
      this.showViewModal = false
      this.showEditModal = true
    },
    
    closeModal() {
      this.showCreateModal = false
      this.showEditModal = false
      this.showViewModal = false
      this.selectedNote = null
      this.form = { title: '', content: '' }
    },
    
    truncateContent(content) {
      return content.length > 150 ? content.substring(0, 150) + '...' : content
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>