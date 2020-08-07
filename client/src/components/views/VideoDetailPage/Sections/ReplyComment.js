import React,{useEffect,useState} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])
   

    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment  refreshFunction={props.refreshFunction} CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id}  />
                    </div>
                }
            </React.Fragment>
        ))



        const handleChange = () => {
            setOpenReplyComments(!OpenReplyComments)
        }


    return (
        <div>
           {ChildCommentNumber > 0 &&      //comment가 한개이상 잇어야 아래 글이 표시된다.
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
             </p>
            }

            {OpenReplyComments &&        //Reply가 참일때만 열림
                renderReplyComment(props.parentCommentId)
            }
        
        </div>
    )
}

export default ReplyComment
