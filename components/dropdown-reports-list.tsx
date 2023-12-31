import FinancialRecord from "@/interfaces/FinancialRecord";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface DropdownReportsListProps {
  financialReports: FinancialRecord[];
  onSelectReport: (report: FinancialRecord) => void;
}

const DropdownReportsList = (props: DropdownReportsListProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Pieejamās budžeta atskaites</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 mr-5 ml-5">
        {props.financialReports &&
          props.financialReports.map((report) => (
            <DropdownMenuItem key={report.id} onClick={() => props.onSelectReport(report)}>
              {report.title}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownReportsList;
