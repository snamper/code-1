import React from 'react'
import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import { Table, Pagination } from 'antd';
const DataTabel = ({
  ...tabelProps
}) => {
  const { keySource, paginationProps, location, dispatch, notNeedPagination } = tabelProps;
  location.query = queryString.parse(location.search)
  const { pathname, query } = location;
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  let totalSize = ''
  if(!notNeedPagination) {
  	const { total } = paginationProps
  	totalSize = total
  }
  return (
    <div>
      <Table {...tabelProps}
        rowKey={record => record[keySource]}
        bordered={true}
        pagination={false}
      />
      {!notNeedPagination && totalSize && totalSize > 0?<div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          onChange={(pageNo, pageSize) => {handleRefresh({pageNo, pageSize})}}  
          onShowSizeChange={(pageNo, pageSize) => {handleRefresh({pageNo, pageSize})}} 
          {...paginationProps}
        />
      </div>:''}
      
    </div>
  )
}

export default DataTabel

// tabelProps                      表格属性对象，参数如下

// columns                         tabel表格列名及字段取值
// keySource                       tabel key值
// dataSource                      tabel数据源
// location                        location方法
// dispatch                        dispatch方法
// notNeedPagination               是否需要分页  需要就传false或不传，不需要就传true
// paginationProps                 分页属性 对象，参数如下
//   defaultCurrent                当前页码
//   total                         数据总条数
//   defaultPageSize               当前每页显示条数
// 
// 示例如下
// tabelProps = {                  表格属性
//   columns:columns,              tabel表格列
//   keySource:"channelId",        key值
//   dataSource:memberModel.dataSource,            tabel数据源
//   location:location,                            location方法
//   dispatch:dispatch,                            dispatch方法
//   notNeedPagination:false,                      是否需要分页
//   paginationProps: {                            分页属性
//     defaultCurrent:memberModel.currentPage,     当前页码
//     total:memberModel.totalSize,                总条数
//     defaultPageSize:memberModel.pageSize        当前每页显示条数
//   }
// }
