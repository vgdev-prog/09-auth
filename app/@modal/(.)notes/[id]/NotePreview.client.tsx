'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal>
        <div style={{ padding: '20px' }}>
          <h2>Error</h2>
          <p>Failed to load note. Please try again.</p>
          <button onClick={handleClose} style={{ marginTop: '10px' }}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal>
        <div style={{ padding: '20px' }}>
          <h2>Note Not Found</h2>
          <p>The requested note could not be found.</p>
          <button onClick={handleClose} style={{ marginTop: '10px' }}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div style={{ padding: '20px', maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ margin: 0 }}>{note.title}</h2>
          <button 
            onClick={handleClose}
            style={{
              background: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
        
        <p style={{ marginBottom: '15px' }}>{note.content}</p>
        
        <div
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          {note.tag}
        </div>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={handleClose}
            style={{
              background: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}