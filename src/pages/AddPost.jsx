import React from 'react'
import { Container, PostForm } from "../components"

function AddPost() {
  return (
    <div className='py-12' style={{ backgroundColor: '#0B0B0B', minHeight: '80vh' }}>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost