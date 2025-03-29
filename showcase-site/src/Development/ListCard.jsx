import PropTypes from 'props-types'

ListCard.propTypes = {
    taskTitle: PropTypes.string,
    taskDateTime: PropTypes.string
}

const ListCard = ({taskTitle, taskDateTime}) => {  
    return <li>{`${taskTitle}  ${taskDateTime}`}</li>
}

export default ListCard