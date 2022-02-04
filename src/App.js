import { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import MainHeader from './components/MainHeader';
import ModalEdit from './components/ModalEdit';
import NewEntryForm from './components/NewEntryForm';
import {useSelector} from 'react-redux'; 


function App() {
  const [incomeTotal, setincomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [entry, setEntry] = useState();
  const entries = useSelector(state => state.entries);
  const {isOpen, id} = useSelector(state => state.modals);

  useEffect(() => {
   const index = entries.findIndex(entry => entry.id === id);
   setEntry(entries[index]);
  }, [isOpen, id]);

  useEffect(()=> {
    let totalIncome = 0;
    let totalExpense = 0;
    entries.map(entry => {
      if(entry.isExpense) {
        return (totalExpense += Number(entry.value));
      } 
       return (totalIncome += Number(entry.value));
      
    });
    setTotal(totalIncome - totalExpense);
    setincomeTotal(totalIncome);
    setExpenseTotal(totalExpense);
    //console.log(`total incomes are: ${totalIncome} and total expenses are: ${totalExpense}`);
  }, [entries]);

  return (
    <Container>

      <MainHeader title='Budget' />

      <DisplayBalance
        title='Your balance'
        value={total}
        size='small'
        textAlign='center'
      />

    <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal}/>

      <MainHeader title='History' type='h3' />
 
      <EntryLines entries={entries} />
      
      <MainHeader title='Add new transaction' type='h3' />

      <NewEntryForm />
      
      <ModalEdit isOpen={isOpen} {...entry} />

    </Container>
  );
}

export default App;