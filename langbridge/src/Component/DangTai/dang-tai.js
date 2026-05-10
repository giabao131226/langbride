
import { Editor } from "@tinymce/tinymce-react";

export default function DangTai({ acc, handlePostBaiDang, handleChange, images, showImage, handleRemoveImage,dataUpToServer,setDataUpToServer }) {
    console.log(images);
    return (
        <>
            <form id="form-post" className="compose-card" onSubmit={handlePostBaiDang}
            >
                <div className="compose-top">
                    <img
                        className="compose-avatar"
                        src={"http://localhost:5000" + acc.avatar}
                        alt="Me"
                    />

                    {/* <textarea
                        name="conTent"
                        className="compose-textarea"
                        placeholder="Share a tip, ask a question, or celebrate a milestone… 🎉"
                        onChange={handleChange}
                    ></textarea> */}

                    <Editor
                        onEditorChange={(content) => {
                            console.log(content);
                            setDataUpToServer({...dataUpToServer,"conTent": content})
                        }}
                        name="conTent"
                        className="compose-textarea"
                        apiKey='1a2hzecrr53ypadb7v095uo5i8u7xzhzy2a0al9uyn03q53h'
                        init={{
                            height: 500,
                            width: "100%",
                            menubar: true,
                            plugins: [
                                'lists',
                                'link',
                                'image',
                                'table',
                                'code'
                            ],

                            toolbar: `
      undo redo |
      bold italic underline |
      forecolor backcolor |
      fontsizeselect |
      alignleft aligncenter alignright alignjustify |
      bullist numlist outdent indent |
      image table code
    `
                        }}
                        initialValue="Share a tip, ask a question, or celebrate a milestone… 🎉"
                    />

                </div>

                <div className="compose-tags">
                    <span className="compose-tag selected">❓ Question</span>
                    <span className="compose-tag">💡 Tip</span>
                    <span className="compose-tag">🎉 Milestone</span>
                    <span className="compose-tag">📝 Vocabulary</span>
                    <span className="compose-tag">🎙️ Speaking</span>
                    <span className="compose-tag">📖 Resource</span>
                </div>

                <div className="compose-images">

                    {images.map((item, index) => <div className="relative compose-img">
                        <img key={index}
                            className="compose-img-thumb"
                            src={URL.createObjectURL(item)}
                            alt=""
                        />
                        <button type="button" onClick={() => { handleRemoveImage(index); }}>x</button>
                    </div>)}

                    <label className="compose-img-add" htmlFor="community-add-file">
                        <i className="fa fa-plus"></i>
                        <span>Add photo</span>
                    </label>
                    <input type="file" id="community-add-file" className="d-none" onChange={showImage} accept="image/*" multiple></input>

                </div>

                <div className="compose-toolbar">

                    <div className="compose-actions">
                        <button className="compose-action-btn" title="Photo" type="button">
                            <i className="fa fa-image"></i>
                        </button>

                        <button className="compose-action-btn" title="GIF" type="button">
                            <i className="fa fa-film"></i>
                        </button>

                        <button className="compose-action-btn" title="Audio" type="button">
                            <i className="fa fa-microphone"></i>
                        </button>

                        <button className="compose-action-btn" title="Link" type="button">
                            <i className="fa fa-link"></i>
                        </button>

                        <button className="compose-action-btn" title="Emoji" type="button">
                            <i className="fa fa-smile"></i>
                        </button>

                        <button className="compose-action-btn" title="Mention" type="button">
                            <i className="fa fa-at"></i>
                        </button>
                    </div>

                    <div className="compose-right">

                        <div className="compose-audience">
                            <i className="fa fa-globe"></i>
                            {" "}Everyone{" "}
                            <i
                                className="fa fa-chevron-down"
                                style={{ fontSize: "10px" }}
                            ></i>
                        </div>

                        <button className="btn-post" type="submit">
                            <i className="fa fa-paper-plane"></i> Post
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}