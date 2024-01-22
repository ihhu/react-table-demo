import { FC, useEffect, useState, useMemo } from "react"
import { Table, Space, Button } from "antd"

interface Record {
  id: number,
  name: string,
  price: number,
  time?: string,
  [props: string]: any
}
interface Props {
  tableData: {
    [props: string]: any
  }
}

const Component: FC<Props> = ({ tableData }) => {
  const [innerData, setInnerData] = useState([])


  useEffect(() => {
    const exclude = ["id"];
    const keys = Object.keys(tableData).filter(key => !exclude.includes(key));
    setInnerData(keys.map((key, index) => {
      const data = tableData[key];
      const allName = data.map(item => item.name);
      const array = data.map((item, _index) => {
        return {
          parentIndex:index,
          key: `${index}__${_index}`,
          label: key,
          name: item.name,
          ...(_index === 0 ? { isHead: true, rowSpan:data.length,allName, open: false } : { isHead: false })
        }
      })
      return array
    }).reduce((array, item) => {
      return [...array, ...item];
    }, []));

  }, [tableData]);

  const handleOpenDetail = (state: boolean, record: Record, index: number) => {
    record.open = state;
    innerData.splice(index, 1, record)
    setInnerData([...innerData])
  }
  const columns: any = useMemo(() => {
    let parentIndex = -1;
    return [
      { title: "表头1", dataIndex: "label", align: "center" ,onCell(record){
        let rowSpan = 0;
        if(record.isHead){
          rowSpan = record.rowSpan
        }
        return {rowSpan}
      }},
      {
        title: "表头2", align: "center", render(text, record, index) {
          if (record.open) {
            return <>{record.isHead ? <Space><p>{record.name} </p><Button size="small" type="text" onClick={() => handleOpenDetail(false, record, index)}>收起按钮</Button></Space> : <Space><p>{record.name} </p> </Space>}</>
          } else {
            return <>{record.allName ? <Space><p>{record.allName.join(" | ")}</p><Button size="small" type="text" onClick={() => handleOpenDetail(true, record, index)}>展开按钮</Button></Space> : <Space><p>{record.name} </p> </Space>}</>
          }
        },onCell(record){
          let rowSpan = 0;
          if(record.open){
            rowSpan = 1;
            parentIndex = record.parentIndex;
          }else if(record.isHead){
            rowSpan = 1
          }else if(record.parentIndex === parentIndex){
            rowSpan = 1
          }
          return {rowSpan}
        }
      },
    ]

  }, [innerData])

  return <Table columns={columns} dataSource={innerData} pagination={false}></Table>

}

export default Component;