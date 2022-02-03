import { 
  Container, 
  Grid, 
  Icon, 
  Segment, 
} from 'semantic-ui-react';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import MainHeader from './components/MainHeader';
import NewEntryForm from './components/NewEntryForm';
import EntryLine from './EntryLine';
//import './App.css';

function App() {
  return (
    <Container>

      <MainHeader title='Budget' />

      <DisplayBalance
        title='Your balance'
        value='2,550.53'
        size='small'
        textAlign='center'
      />

    <DisplayBalances />

      <MainHeader title='History' type='h3' />
 

      <EntryLine description='income' value='$10.00'/>
      <EntryLine description='expense' value='$10.00' isExpense='true'/>

      <MainHeader title='Add new transaction' type='h3' />

      <NewEntryForm />
    </Container>
  );
}

export default App;
