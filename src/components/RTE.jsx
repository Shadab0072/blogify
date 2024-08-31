import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';

const RTE = ({name,label,control,defaultValue=""}) => {



  return (
   <>
   <div className='w-full  mt-10 '> 
  

    <Controller
    
    name={name || "content"}
    control={control}
    render={({field: {onChange}})=>(
        <Editor
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 400,
            menubar: false,
            plugins: [
                
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
           toolbar:
            "undo redo | blocks | image|  bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }} 
        onEditorChange={onChange}
        />
    )}   
    />

   </div>
   </>
  )
}

export default RTE