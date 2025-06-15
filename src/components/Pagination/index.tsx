import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import Select from '../select';
interface IPaginationProps {
	meta: any;
	pageNeighbours?: number;
	onPageChanged?: (metaData: any) => void;
	isLimitChangeable?: boolean;
	hideDataCount?: boolean;
	setSearchParams?: boolean;
}

const limitOption = [
	{ text: '5', value: 5 },
	{ text: '10', value: 10 },
	{ text: '20', value: 20 },
	{ text: '30', value: 30 },
	{ text: '40', value: 40 },
	{ text: '50', value: 50 },
	{ text: '100', value: 100 },
];

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
	let i = from;
	const range = [];
	while (i <= to) {
		range.push(i);
		i += step;
	}
	return range;
};

const Pagination: React.FC<IPaginationProps> = ({
	meta,
	pageNeighbours = 1,
	isLimitChangeable = true,
	hideDataCount,
	onPageChanged,
	setSearchParams,
}: IPaginationProps) => {
	const [currentPage, setCurrentPage] = useState<number>(meta?.page || 0);
	const totalPages: number = meta?.totalPageCount as number;
	const pageLimit: number = meta?.limit as number;
	const totalRecords: number = meta?.totalRecords as number;

	useEffect(() => {
		setCurrentPage((meta?.page as number) + 1);
	}, [meta?.page]);

	const gotoPage = (page: number) => {
		const currentPage = Math.max(0, Math.min(page, totalPages)) - 1;
		setCurrentPage(currentPage);
		onPageChanged && onPageChanged({ ...meta, page: currentPage });
	};

	const onLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onPageChanged &&
			onPageChanged({
				...meta,
				page: 0,
				limit: +e.target.value,
			});
	};

	const handleClick = (page: number, evt: any) => {
		evt.preventDefault();
		gotoPage(page);
	};

	const handleMoveLeft = (evt: any) => {
		evt.preventDefault();
		gotoPage(currentPage - pageNeighbours * 2 - 1);
	};

	const handleMoveRight = (evt: any) => {
		evt.preventDefault();
		gotoPage(currentPage + pageNeighbours * 2 + 1);
	};

	const fetchPageNumbers = () => {
		const totalNumbers = pageNeighbours * 2 + 3;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			let pages = [];

			const leftBound = currentPage - pageNeighbours;
			const rightBound = currentPage + pageNeighbours;
			const beforeLastPage = totalPages - 1;

			const startPage = leftBound > 2 ? leftBound : 2;
			const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

			pages = range(startPage, endPage);

			const pagesCount = pages.length;
			const singleSpillOffset = totalNumbers - pagesCount - 1;

			const leftSpill = startPage > 2;
			const rightSpill = endPage < beforeLastPage;

			const leftSpillPage = LEFT_PAGE;
			const rightSpillPage = RIGHT_PAGE;

			if (leftSpill && !rightSpill) {
				const extraPages = range(startPage - singleSpillOffset, startPage - 1);
				pages = [leftSpillPage, ...extraPages, ...pages];
			} else if (!leftSpill && rightSpill) {
				const extraPages = range(endPage + 1, endPage + singleSpillOffset);
				pages = [...pages, ...extraPages, rightSpillPage];
			} else if (leftSpill && rightSpill) {
				pages = [leftSpillPage, ...pages, rightSpillPage];
			}

			return [1, ...pages, totalPages];
		}
		return range(1, totalPages);
	};

	if (!totalRecords) return null;
	const pages = fetchPageNumbers();

	return (
		<div className='row'>
			{isLimitChangeable || !hideDataCount ? (
				<div
					className={clsx('d-flex align-items-center gap-3 justify-content-center justify-content-md-start', {
						'col-md-3 col-xl-2': hideDataCount,
						'col-md-5': !hideDataCount,
					})}
				>
					{isLimitChangeable && (
						<Select
							options={limitOption}
							textKey='text'
							// valueKey='value'
							value={pageLimit}
							// acceptNull={false}
							noMargin
							onChange={onLimitChange}
						/>
					)}
					{hideDataCount ? null : (
						<span>
							{(currentPage * pageLimit + 1 - pageLimit)} to&nbsp;
							{(currentPage * pageLimit)} shown,&nbsp;
							<b>Total {(totalRecords?.toLocaleString())}</b>
						</span>
					)}
				</div>
			) : null}
			{pages?.length > 1 && (
				<nav
					className={clsx(
						'col-md-7 d-flex align-items-center justify-content-center justify-content-md-end',
						{
							'col-md-12 justify-content-md-center': !isLimitChangeable && hideDataCount,
							'col-md-9 col-xl-10': hideDataCount,
						}
					)}
				>
					<ul className='pagination mt-3 mt-md-0'>
						{pages.map((page, index) => {
							if (page === LEFT_PAGE)
								return (
									<li
										key={index}
										className='page-item'
									>
										<button
											className='page-link'
											aria-label='Previous'
											onClick={handleMoveLeft}
										>
											<span aria-hidden='true'>&laquo;</span>
										</button>
									</li>
								);

							if (page === RIGHT_PAGE)
								return (
									<li
										key={index}
										className='page-item'
									>
										<button
											className='page-link'
											aria-label='Next'
											onClick={handleMoveRight}
										>
											<span aria-hidden='true'>&raquo;</span>
										</button>
									</li>
								);

							return (
								<li
									key={index}
									className={clsx(['page-item', { active: currentPage === page }])}
								>
									<button
										className='page-link'
										onClick={(e) => currentPage !== page && handleClick(page as number, e)}
									>
										{(page)}
									</button>
								</li>
							);
						})}
					</ul>
				</nav>
			)}
		</div>
	);
};

export default memo(Pagination);
