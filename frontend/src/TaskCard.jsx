import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function TaskCard(props) {
    return (
        <Card
        style={{ width: '18rem' }}
         className={'shadow-sm mb-3 $(props.isDarkmode ? "bg-dark text-light" : "bg-white border-primary")'}
         >
        <Card.Header className={`fw-bold ${props.isDarkmode ? "bg-dark text-light" : "bg-primary text-white"}`}>
            {props.task.subject}
        </Card.Header>
        <Card.Body>
        <Card.Title className={props.isDarkmode ? "text-warning fs-6" : "text-danger fs-6"}>
            Due: {props.deadline}
        </Card.Title>
        <Card.Text>{props.task.taskDetails}</Card.Text>
        <Button variant="success" className="w-100" onClick={props.deleteTask}>
            Mark as Done ✔️
        </Button>
        </Card.Body>
        </Card>
    );
}

export default TaskCard;