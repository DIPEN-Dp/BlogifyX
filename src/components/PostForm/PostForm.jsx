import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import appwriteService from "../../Appwrite/database_services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const [error, setError] = React.useState("");
  const { register, handleSubmit, control, setValue, getValues, watch, formState: { errors } } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "Active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setError("");
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
          setError(err.message || "Failed to create post. Check Appwrite logs.");
        }
      } else {
        setError("Failed to upload image.");
      }
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
    <div className="w-full max-w-5xl mx-auto glass p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <h1 className="text-2xl font-bold text-white mb-6 pl-1 flex items-center gap-2">
        <span>{post ? "✏️ Edit Post" : "✍️ Create a New Post"}</span>
      </h1>

      {error && (
        <div className="bg-red-500/15 border border-red-500/30 text-red-400 text-sm py-3 px-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-2/3 px-3 space-y-5">
          <div>
            <Input
              label="Post Title"
              placeholder="Give your masterpiece a title..."
              {...register("title", { required: true })}
            />
            {errors.title && <p className="text-red-400 text-xs mt-1 pl-1">Title is required</p>}
          </div>

          <div>
            <Input
              label="Slug URL"
              placeholder="Slug auto-generates here..."
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
            {errors.slug && <p className="text-red-400 text-xs mt-1 pl-1">Slug is required</p>}
          </div>

          <div className="relative">
            <RTE label="Content Body" name="content" control={control} defaultValue={getValues("content")} />
          </div>
        </div>

        <div className="w-full lg:w-1/3 px-3 mt-6 lg:mt-0 space-y-5">
          <div className="glass p-5 rounded-2xl border border-white/5 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Featured Image</label>
              <div className="relative border border-dashed border-white/10 hover:border-purple-500/50 rounded-xl p-4 text-center cursor-pointer transition-colors duration-200">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />
                <div className="text-slate-400 text-xs space-y-1">
                  <span className="block text-xl">📁</span>
                  <span className="block font-medium text-slate-300">Choose file or drag here</span>
                  <span className="block text-[10px] text-slate-500">Supports PNG, JPG, JPEG, GIF</span>
                </div>
              </div>
              {errors.image && <p className="text-red-400 text-xs mt-1.5 pl-1">Featured image is required</p>}
            </div>

            {post && post.featuredimage && (
              <div className="w-full overflow-hidden rounded-xl border border-white/5">
                <img
                  src={appwriteService.getFilePreview(post.featuredimage)}
                  alt={post.title}
                  className="w-full h-32 object-cover"
                />
              </div>
            )}

            <Select
              options={["active", "inactive"]}
              label="Publish Status"
              {...register("status", { required: true })}
            />

            <Button type="submit" className="w-full py-3 text-sm font-bold shadow-lg mt-4">
              {post ? "Update Article" : "Publish Article"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
