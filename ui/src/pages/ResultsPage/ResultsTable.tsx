import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';

// interface ResultsListProps {
//   results: PairingJSON[];
//   onResultClick: Dispatch<number>;
// }

// function ResultsTable({results, onResultClick}: ResultsListProps): JSX.Element {
//   results = results.concat(results).concat(results);
//   return (
//     <TableContainer>
//       <Table size="small" sx={{minWidth: 300, maxWidth: 300}}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Beer</TableCell>
//             <TableCell>ABV</TableCell>
//             <TableCell>Match</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {
//             results.map((result, index) => (  
//               <TableRow key={result.id} onClick={() => onResultClick(index)}>    
//                 <TableCell>{`${result.name}`}</TableCell>
//                 <TableCell>{`${result.abv}%`}</TableCell>
//                 <TableCell>{`${result.matchScore}`}</TableCell>
//               </TableRow>
//             ))
//           }
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
