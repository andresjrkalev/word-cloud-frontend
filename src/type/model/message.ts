import Occurrence from './occurrence';

interface Message {
  id: number;
  value: string;
  occurrences: Occurrence[];
}

export default Message;
