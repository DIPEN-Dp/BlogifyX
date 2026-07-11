import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import appwriteService from "../../Appwrite/database_services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pencil, PenLine, FolderOpen } from "lucide-react";

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
    <div className="w-full max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl border border-neutral-black-200 shadow-sm relative overflow-hidden">
      <h1 className="text-2xl font-bold font-heading text-neutral-black-950 mb-6 pl-1 flex items-center gap-2">
        {post ? <Pencil className="w-6 h-6 text-brand-orange-500" /> : <PenLine className="w-6 h-6 text-brand-orange-500" />}
        <span>{post ? "Edit Post" : "Create a New Post"}</span>
      </h1>

      {error && (
        <div className="bg-red-550/15 bg-red-50 border border-red-200 text-red-600 text-sm py-3 px-4 rounded-lg mb-6 font-medium">
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
            {errors.title && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">Title is required</p>}
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
            {errors.slug && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">Slug is required</p>}
          </div>

          <div className="relative">
            <RTE label="Content Body" name="content" control={control} defaultValue={getValues("content")} />
          </div>
        </div>

        <div className="w-full lg:w-1/3 px-3 mt-6 lg:mt-0 space-y-5">
          <div className="bg-neutral-black-50/50 p-5 rounded-xl border border-neutral-black-100 space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-black-700 mb-2">Featured Image</label>
              <div className="relative border border-dashed border-neutral-black-200 hover:border-brand-orange-500 rounded-lg p-4 text-center cursor-pointer transition-colors duration-200 bg-white">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />
                <div className="text-neutral-black-500 text-xs flex flex-col items-center justify-center space-y-1">
                  <FolderOpen className="w-8 h-8 text-brand-orange-500 mb-2" />
                  <span className="block font-medium text-neutral-black-700">Choose file or drag here</span>
                  <span className="block text-[10px] text-neutral-black-400">Supports PNG, JPG, JPEG, GIF</span>
                </div>
              </div>
              {errors.image && <p className="text-red-500 text-xs mt-1.5 pl-1 font-medium">Featured image is required</p>}
            </div>

            {post && post.featuredimage && (
              <div className="w-full overflow-hidden rounded-lg border border-neutral-black-200">
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

            <Button type="submit" className="w-full py-3 text-sm font-bold shadow-sm mt-4">
              {post ? "Update Article" : "Publish Article"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
