import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import appwriteService from "../../Appwrite/database_services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pencil, PenLine, ImagePlus, AlertCircle, ArrowRight } from "lucide-react";

function PostForm({ post }) {
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const { register, handleSubmit, control, setValue, getValues, watch, formState: { errors } } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setError("");
    setSubmitting(true);
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          appwriteService.deleteFile(post.featuredimage);
        }

        const DBpost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        if (DBpost) {
          navigate(`/post/${DBpost.$id}`);
        } else {
          setError("Failed to update post.");
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          try {
            const fileId = file.$id;
            data.featuredImage = fileId;

            const DBpost = await appwriteService.createDocument({
              ...data,
              userId: userData.$id,
            });
            if (DBpost) {
              navigate(`/post/${DBpost.$id}`);
            }
          } catch (err) {
            setError(err.message || "Failed to create post.");
          }
        } else {
          setError("Failed to upload image.");
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      const slug = value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, "-");
      return slug.substring(0, 36);
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <div
      className="w-full max-w-5xl mx-auto fade-in"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #2B2B2B',
        borderRadius: '24px',
        padding: '2rem',
      }}
    >
      {/* Form header */}
      <div className="flex items-center gap-2.5 mb-8 pb-6" style={{ borderBottom: '1px solid #1F1F1F' }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(200, 255, 46, 0.1)', border: '1px solid rgba(200, 255, 46, 0.2)' }}
        >
          {post
            ? <Pencil size={16} style={{ color: '#C8FF2E' }} />
            : <PenLine size={16} style={{ color: '#C8FF2E' }} />
          }
        </div>
        <div>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: '#FFFFFF', letterSpacing: '-0.025em' }}
          >
            {post ? "Edit Article" : "Write New Article"}
          </h1>
          <p className="text-xs" style={{ color: '#6B7280' }}>
            {post ? "Update your published article" : "Share your knowledge with the community"}
          </p>
        </div>
      </div>

      {error && (
        <div
          className="flex items-start gap-3 text-sm py-3 px-4 rounded-2xl mb-6"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#EF4444',
          }}
        >
          <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-3">
        {/* Left column – main content */}
        <div className="w-full lg:w-2/3 px-3 space-y-5">
          <div>
            <Input
              label="Article Title"
              placeholder="Give your article a compelling title..."
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-xs mt-1.5 pl-1" style={{ color: '#EF4444' }}>Title is required</p>
            )}
          </div>

          <div>
            <Input
              label="Slug URL"
              placeholder="auto-generates from title..."
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
            {errors.slug && (
              <p className="text-xs mt-1.5 pl-1" style={{ color: '#EF4444' }}>Slug is required</p>
            )}
          </div>

          <div className="relative">
            <RTE label="Content Body" name="content" control={control} defaultValue={getValues("content")} />
          </div>
        </div>

        {/* Right column – sidebar */}
        <div className="w-full lg:w-1/3 px-3 mt-6 lg:mt-0 space-y-5">
          <div
            className="space-y-5"
            style={{
              backgroundColor: '#0B0B0B',
              border: '1px solid #1F1F1F',
              borderRadius: '20px',
              padding: '1.25rem',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#6B7280' }}>
              Publish Settings
            </p>

            {/* Image upload */}
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#9CA3AF' }}>
                Featured Image
              </label>
              <div
                className="relative text-center cursor-pointer transition-all duration-200 group"
                style={{
                  border: '1px dashed #2B2B2B',
                  borderRadius: '16px',
                  padding: '1.5rem 1rem',
                  backgroundColor: '#111111',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,255,46,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2B2B2B'}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(200,255,46,0.08)' }}
                  >
                    <ImagePlus size={18} style={{ color: '#C8FF2E' }} />
                  </div>
                  <span className="block text-sm font-medium" style={{ color: '#FFFFFF' }}>
                    Drop image here
                  </span>
                  <span className="block text-xs" style={{ color: '#6B7280' }}>
                    PNG, JPG, JPEG, GIF
                  </span>
                </div>
              </div>
              {errors.image && (
                <p className="text-xs mt-1.5 pl-1" style={{ color: '#EF4444' }}>Featured image is required</p>
              )}
            </div>

            {/* Current image preview */}
            {post && post.featuredimage && (
              <div
                className="w-full overflow-hidden"
                style={{ borderRadius: '12px', border: '1px solid #2B2B2B' }}
              >
                <img
                  src={appwriteService.getFilePreview(post.featuredimage)}
                  alt={post.title}
                  className="w-full h-28 object-cover"
                />
              </div>
            )}

            <Select
              options={["active", "inactive"]}
              label="Publish Status"
              {...register("status", { required: true })}
            />

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center py-3 mt-2"
              style={{ opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Publishing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {post ? "Update Article" : "Publish Article"}
                  <ArrowRight size={14} />
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
