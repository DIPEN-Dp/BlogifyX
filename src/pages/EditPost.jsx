import React from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import appwriteServices from "../Appwrite/database_services";

function EditPost() {
  const [post, setPost] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-12 min-h-[80vh] flex flex-col justify-center">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
