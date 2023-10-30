import React from 'react';
import { Avatar, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { ERC20TokenBalance } from '~/types';

interface Props {
	data: ERC20TokenBalance[] | null;
}

interface DataType {
	key: React.Key;
	label: React.ReactNode;
	name: React.ReactNode;
	balance: { value: number; label: React.ReactNode };
	current_usd_price: number;
}

const columns: ColumnsType<DataType> = [
	{
		title: <span className='text-sm sm:text-lg'>Coin</span>,
		dataIndex: 'label',
	},
	{
		title: <span className='text-sm sm:text-lg'>Name</span>,
		dataIndex: 'name',
		responsive: ['md'],
	},
	{
		title: <span className='text-sm sm:text-lg'>Balance</span>,
		dataIndex: ['balance', 'label'],
		sorter: (a, b) => a.balance.value - b.balance.value,
	},
	{
		title: <span className='text-sm sm:text-lg'>Price in USD</span>,
		dataIndex: 'current_usd_price',
		sorter: (a, b) => a.current_usd_price - b.current_usd_price,
	},
];

const TokenHoldings = ({ data }: Props) => {
	const tableData = data?.map((token, index) => {
		return {
			key: index,
			label: (
				<div className='flex flex-row items-center gap-2'>
					<Avatar
						size={{ xs: 18, sm: 36, md: 36, lg: 36, xl: 36, xxl: 36 }}
						src={token.logos?.at(0)?.uri}
					/>
					<div className='hidden text-lg font-semibold sm:flex'>
						{token.symbol.length < 8 && token.symbol}
					</div>
				</div>
			),
			name: <span className='text-[1rem]'>{token.name}</span>,
			balance: {
				value: parseInt(
					(parseInt(token.balance) / 10 ** token.decimals).toFixed(2)
				),
				label: (
					<div className='flex flex-row items-center gap-2 text-[1rem] font-medium'>
						<span>{parseInt(token.balance) / 10 ** token.decimals}</span>
						<span>{token.symbol.length < 8 && token.symbol}</span>
					</div>
				),
			},
			current_usd_price: token.current_usd_price,
		} as DataType;
	});
	return (
		<Table
			columns={columns}
			dataSource={data ? tableData : []}
			tableLayout='auto'
		/>
	);
};

export default TokenHoldings;
