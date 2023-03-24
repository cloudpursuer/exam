import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetAllExamQuery } from '../../../../store/api/examApi';
import SimpleBackdrop from '../../backdrop';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columns: GridColDef[] = [
    { field: 'ID', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: '考试名称', width: 130 },
    { field: 'Specialty', headerName: '专业', width: 90 },
    { field: 'Grade', headerName: '年级', width: 90 },
    { field: 'Duration', headerName: '考试时间（分）', width: 120 },
    { field: 'Organizer', headerName: '教研室', width: 130 },
    { field: 'Position', headerName: '地点', width: 90 },
    { field: 'Class', headerName: '班级', width: 160 },
    { field: 'Number', headerName: '人数', width: 70 },
    { field: 'Month', headerName: '月份', width: 70 },
    { field: 'Day', headerName: '日期', width: 70 },
];

export default function ExamManagement() {
    //@ts-ignore
    const { data, isFetching, isSuccess } = useGetAllExamQuery()
    let id = 1
    return (
        <>
            {isSuccess &&
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        //@ts-ignore
                        getRowId={() =>id++ }
                        rows={data.data[0]}
                        columns={columns}
                        checkboxSelection
                        onRowClick={() => console.log(222)}
                    />
                </div>
            }
            {isFetching&&<SimpleBackdrop/>}
            <ControlledAccordions/>
        </>
    );
}

function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
  
    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };
  
    return (
      <div>
        <Accordion expanded={expanded === 'panel1'} sx={{marginTop:2}} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0, }}>
              增加考试
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }