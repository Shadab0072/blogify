import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import Select from './Select'
import service from "../appwrite/db";

const PostForm = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [uploadTime, setUploadTime] = useState(10); // State for tracking the countdown, initialized to 10 seconds

  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    setUploadTime(10); // Reset the countdown to 10 seconds when starting the upload

    let timerInterval = setInterval(() => {
      setUploadTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1; // Decrement the time
        } else {
          clearInterval(timerInterval); // Stop the timer at 0
          return 0;
        }
      });
    }, 1000);

    try {
      if (post) {
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

        if (file) {
          service.deleteFile(post.featuredImage);
        }

        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          clearInterval(timerInterval); // Clear the timer when the upload completes
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await service.uploadFile(data.image[0]);

        if (file && file.$id) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          const dbPost = await service.createPost({ ...data, userId: userData.$id });

          if (dbPost) {
            clearInterval(timerInterval); // Clear the timer when the upload completes
            navigate(`/post/${dbPost.$id}`);
          }
        } else {
          console.error("File upload failed or file.$id is undefined");
          clearInterval(timerInterval); // Clear the timer if there is an issue
          return; // Early return if there's an issue with the file upload
        }
      }
    } catch (error) {
      console.error("An error occurred during upload", error);
      clearInterval(timerInterval); // Clear the timer on error
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe(); // For better optimization of useEffect
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap justify-center gap-6 bg-white p-5">
  {/* Left Column */}
  <div className="flex flex-col gap-4 w-full md:w-auto">
    <div>
      <Input
        label="Title :"
        placeholder=""
        className="mb-4 w-full"
        {...register("title", { required: true })}
      />
    </div>
    <div>
      <Input
        label="Post ID :"
        placeholder=""
        className="mb-4 w-full"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
        }}
      />
    </div>

    <RTE
      label="Content :"
      name="content"
      control={control}
      defaultValue={getValues("content")}
      className="w-full"
    />
  </div>

  {/* Right Column */}
  <div className="flex flex-col w-full md:w-auto gap-6">
    <div>
      <Input
        label="Featured Image :"
        type="file"
        className="w-full"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
      />
    </div>

    {/* Display the image if the post exists */}
    {post && (
      <div className="max-w-[250px] max-h-[250px] overflow-hidden">
        <img
          src={service.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-lg"
        />
      </div>
    )}

    <div>
      <Select
        options={["active", "inactive"]}
        label="Current Status"
        className="mb-4 w-full"
        {...register("status", { required: true })}
      />
    </div>

    <div>
      <button
        type="submit"
        className={`w-full text-lg ${"bg-black"} text-white hover:bg-slate-300 hover:text-slate-800 transition delay-100 border border-white px-12 py-2 font-light`}
      >
        {post ? "Update" : "Upload"}
      </button>
    </div>

    {/* Loading and Information Section */}
    <div className="text-2xl w-full text-center">
      {loading ? (
        <div className="flex flex-col gap-2 items-center">
          <div className="loader"></div>
          <div className="text-lg font-bold">Uploading... {uploadTime} seconds remaining</div>
        </div>
      ) : (
        <div className="text-sm font-bold">
          <span className="text-red-700 text-lg">*</span> Title & Image Is Mandatory To Post a Blog
        </div>
      )}
    </div>
  </div>
</form>

  );
};

export default PostForm;
