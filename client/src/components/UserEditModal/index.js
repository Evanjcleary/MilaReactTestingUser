import React from "react";
import ReactDom from "react-dom";
import { Input } from "../Form";
import API from "../../utils/API"
import cogoToast from "cogo-toast"

export default class EditMilaModal extends React.Component {

    state = {
        id: this.props.caption._id,
        caption: this.props.caption.caption,
        username: this.props.caption.username,
        category: this.props.caption.category,
        reference: this.props.caption.reference,
        lyric: this.props.caption.lyric,
        quote: this.props.caption.quote,
        originalAuthor: this.props.caption.originalAuthor,
        tags: this.props.caption.tags
    }

    componentDidMount() {
        console.log(this.props.caption)
        console.log(this.props.categories)
  
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    prepareFormSubmit = event => {
        event.preventDefault();

        var apiTags = this.state.tags

        if (typeof apiTags === "string") {
            var dataString = apiTags.replace(/]|[[]\"/g, "");
            var noSpaceString = dataString.replace(/ /g, "");

            this.handleFormSubmit(noSpaceString)

        } else {
            this.handleFormSubmit(apiTags)
        }

    }

    handleSuccess = () => {

        cogoToast.info("Updated Caption!")
        this.props.rerender()
    }

    handleFormSubmit = arr => {

        if (typeof arr === "string") {
            var lowerCaseTags = arr.toLowerCase();
            var splicedArr = lowerCaseTags.split(",")
            console.log(splicedArr);

            API.updateUserCaption(this.state.id, {
                caption: this.state.caption,
                category: this.state.category,
                username: this.state.username,
                reference: this.state.reference,
                originalAuthor: this.state.originalAuthor,
                tags: splicedArr
            })
                .then(res => this.handleSuccess())
                .catch(err => console.log)

        } else {

            API.updateUserCaption(this.state.id, {
                caption: this.state.caption,
                category: this.state.category,
                username: this.state.username,
                reference: this.state.reference,
                originalAuthor: this.state.originalAuthor,
                tags: this.state.tags
            })
                .then(res => this.handleSuccess())
                .catch(err => console.log)
        }

    }


    render() {
        return (
            <div className="card bg-dark text-white">
                <form>
                    <h5>Input your caption here</h5>
                    <Input value={this.state.caption} onChange={this.handleInputChange} name="caption" placeholder="Caption goes here" />
                    <select value={this.state.category} onChange={this.handleInputChange} name="category">

                        {this.props.categories.map(listedcategory => (
                            <option key={listedcategory._id} value={listedcategory.category}>{listedcategory.category}</option>
                        ))}

                    </select>
                    <Input value={this.state.username} onChange={this.handleInputChange} name="username" placeholder="Your username goes here" />
                    <Input value={this.state.reference} onChange={this.handleInputChange} name="reference" placeholder="Caption's reference goes here" />
                    <p>Current Tags {JSON.stringify(this.props.tags)}</p>
                    <Input value={this.state.tags} onChange={this.handleInputChange} name="tags" placeholder="Insert captions here" />
                    <button onClick={this.prepareFormSubmit}>Submit your caption</button>
                </form>
            </div>
        )
    }
}