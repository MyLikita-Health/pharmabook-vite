import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function CustomDropZone({ setFile, data = [],text='' }) {
    const onDrop = useCallback(
        (acceptedFiles) => {
            // Do something with the files
            setFile(acceptedFiles);
        },
        [setFile]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop
    });

    return (
        <section className="container bg-white text-dark">
            <h5 className="text-center">{text}</h5>
            <div
                {...getRootProps({ className: "dropzone" })}
                style={{ cursor: "pointer" }}
                className="p-3 text-center"
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className="p-1">
                <h4>Files</h4>
                <ul>
                    {data.map((file) => (
                        <li key={file.path}>
                            {file.path} - {file.size} bytes
                        </li>
                    ))}
                </ul>
            </aside>
        </section>
    );
}
