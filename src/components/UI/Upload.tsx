import React, {DetailedHTMLProps, FC, InputHTMLAttributes, useEffect, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import {Control, useFormContext, useWatch} from 'react-hook-form'
import {FormFields} from "../ProductUpload/ProductUpload";




interface IFileInputProps
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string,
    maxfile?: number,
    name: string,
    control?: Control<FormFields>
}

const FileInput: FC<IFileInputProps> = (props) => {
    const [files, setFiles] = useState<(File & {preview:string})[]>([]);
    const {name, control} = props
    const {
        setValue,
    } = useFormContext()

    const photoFiles = useWatch({
        control: control,
        name: "photoFiles",
    })

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: props.maxfile,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': [],
            'image/gif': [],
            'image/svg': [],
        },
        onDrop: acceptedFiles => {
            const newArr = photoFiles && photoFiles.concat(acceptedFiles)
            if (name === "photoFiles")
                setValue(name, newArr)
            else
                setValue(name, acceptedFiles)

            setFiles(name === "photoFiles" ? newArr.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })) : acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    })

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div {...getRootProps()}>
            <input
                {...props}
                id={name}
                {...getInputProps()}
            />
        </div>
    )
}

export default FileInput