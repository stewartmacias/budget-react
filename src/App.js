import { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import MainHeader from './components/MainHeader';
import ModalEdit from './components/ModalEdit';
import NewEntryForm from './components/NewEntryForm';



function App() {
  const [entries, setEntries] = useState(initialentries);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState('');
  const [incomeTotal, setincomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(!isOpen && entryId) {
      const index = entries.findIndex(entry => entry.id === entryId);
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      setEntries(newEntries);
      resetEntry();
    }
  }, [isOpen]);

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
  }, [entries])

  //const deleteEntry = (id) => {}
  function deleteEntry(id){
    const result = entries.filter(entry => entry.id !== id);
    //console.log('entries', entries);
    //console.log('result', result);
    setEntries(result);
  }

  function editEntry(id) {
    console.log(`edit entry with id ${id}` );
    if(id){
      const index = entries.findIndex(entry => entry.id === id);
      const entry = entries[index];
      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }
  }

  function addEntry() {
    const result = entries.concat({
      id:entries.length+1, 
      description, 
      value,
      isExpense
    });
    console.log(`entries`, entries);
    console.log(`result`, result);
    setEntries(result);
    resetEntry();
  }

  function resetEntry() {
    setDescription('');
    setValue('');
    setIsExpense(true);
  }

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
 
      <EntryLines 
        entries={entries} 
        deleteEntry={deleteEntry} 
        setIsOpen={setIsOpen}
        editEntry={editEntry}
      />
      
      <MainHeader title='Add new transaction' type='h3' />

      <NewEntryForm 
        addEntry= {addEntry}
        description={description}
        value={value}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense}  
      />
        <ModalEdit 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          addEntry= {addEntry}
          description={description}
          value={value}
          isExpense={isExpense}
          setDescription={setDescription}
          setValue={setValue}
          setIsExpense={setIsExpense}  
        />

    </Container>
  );
}

export default App;

var initialentries = [
  {
    id: 1,
    description : 'Work income',
    value : 1000,
    isExpense: false
  },
  {
    id: 2,
    description : 'Water bill',
    value : 20,
    isExpense: true
  },
  {
    id: 3,
    description : 'Rent',
    value : 200,
    isExpense: true
  },
  {
    id: 4,
    description : 'Power bill',
    value : 50,
    isExpense: true
  }
]
