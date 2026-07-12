import React from 'react'
import {Container,PostForm} from "../components"

function AddPost() {
  return (
    <div className='py-12 min-h-[80vh] flex flex-col justify-center'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost