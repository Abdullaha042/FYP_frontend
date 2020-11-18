import React from 'react';
import { Form,Input,Button } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;//using antd form(already built in)


class CustomForm extends React.Component{


handleFormSubmit = (event, requestType, articleID) => {

    //event.preventDefault();//in order to not reload the page
    const title1 = event.target.elements.title.value;
    const content1 = event.target.elements.content.value;

    switch (requestType){
        case 'post':

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title1 , content : content1})
    };
        fetch('http://127.0.0.1:8000/api/', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));


        case 'put':
        //donot use axios for put use fetch
           //return axios.put(`http://127.0.0.1:8000/api/${articleID}/`,
            //{
            //    title:title1,
            //    content:content1
            //}
        //)
        //.then(res => console.log(res))
        //.catch(error => console.err(error));

        case 'delete':
        //same as delete as well

    }


}



    render() {
        return(
            <div>
                <form onSubmit={(event) => this.handleFormSubmit(event,this.props.requestType,this.props.articleID)}>
                    <FormItem label="Title">
                        <input name="title" placeholder="enter title here"/>
                    </FormItem>
                    <FormItem label="Content">
                        <input name="content" placeholder="enter content here"/>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </form>
            </div>
        );

    }

}

export default CustomForm;