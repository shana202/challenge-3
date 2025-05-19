import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BlogPostForm = ({ post, onSubmit }) => {
    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [author, setAuthor] = useState(post?.author || '');
    const [date, setDate] = useState(post?.date || '');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSucessMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!title) newErrors.title ='Required';
        if (!content) newErrors.content ='Required';
        if (!author) newErrors.author ='Required';
        if (!date) newErrors.date ='Required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onSubmit({ title, content, author, date });
        }
};
return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="author">Author</label>
            <input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>
    
{/* Other form fields similarly */}
    <button type="submit">Save</button>
    </form>
    );
};
export default BlogPostForm;