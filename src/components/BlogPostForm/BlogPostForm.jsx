import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [author, setAuthor] = useState(post?.author || '');
    const [date, setDate] = useState(post?.date || '');
    const [errors, setErrors] = useState({});
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
{/* Other form fields similarly */}
    <button type="submit">Submit</button>
    </form>
    );
};
export default BlogPostForm;