export const Footer = () => {
	return (
		<div className="flex flex-col md:flex-row items-start justify-center gap-4 ">
			<div className="flex flex-col gap-6">
				<ul className="flex flex-col gap-3 md:flex-wrap md:flex-row md:gap-1 transition">
					<li className="pr-6 ">
						<span className="hover:bg-linear-to-r hover:from-emerald-400 hover:via-green-600 hover:to-emerald-400 hover:bg-clip-text hover:text-transparent cursor-pointer transition-all ease-in-out duration-300">
							Правообладателям
						</span>
					</li>
					<li className="pr-6 ">
						<span className="hover:bg-linear-to-r hover:from-emerald-400 hover:via-green-600 hover:to-emerald-400 hover:bg-clip-text hover:text-transparent cursor-pointer transition-all ease-in-out duration-300">
							Пользовательское соглашение
						</span>
					</li>
					<li className="pr-6 ">
						<span className="hover:bg-linear-to-r hover:from-emerald-400 hover:via-green-600 hover:to-emerald-400 hover:bg-clip-text hover:text-transparent cursor-pointer transition-all ease-in-out duration-300">
							Правила рекомендаций (РФ)
						</span>
					</li>
					<li className="pr-6 ">
						<span className="hover:bg-linear-to-r hover:from-emerald-400 hover:via-green-600 hover:to-emerald-400 hover:bg-clip-text hover:text-transparent cursor-pointer transition-all ease-in-out duration-300">
							Политика конфиденциальности
						</span>
					</li>
					<li className="pr-6 ">
						<span className="hover:bg-linear-to-r hover:from-emerald-400 hover:via-green-600 hover:to-emerald-400 hover:bg-clip-text hover:text-transparent cursor-pointer transition-all ease-in-out duration-300">
							Справка
						</span>
					</li>
				</ul>
				<div className="flex justify-center text-gray-400 mb-0 md:mb-10">
					<p className="leading-5">
						Сервис Яндекс Музыка может содержать информацию, не предназначенную для
						несовершеннолетних. Яндекс Музыка – самая точная система музыкальных рекомендаций. По
						степени точности подбора персональных рекомендаций для пользователей в РФ среди
						музыкальных стриминговых сервисов в апреле 2025 года. Основано на данных ООО «Майл дата»
						по результатам опроса на базе Единой панели данных Ромир среди респондентов в возрасте
						18-59 лет.
					</p>
				</div>
			</div>
			<div className="flex flex-nowrap flex-col items-start md:items-end w-full text-gray-400 mb-10 md:mb-0 font-bold">
				<p>© 2026 React Spoty</p>
				<p className="text-nowrap">
					Project made by{' '}
					<a className="bg-radial-to-r cursor-pointer from-blue-800 via-purple-800 to-black text-blue-800 bg-clip-text font-extrabold">
						Miracle
					</a>
				</p>
			</div>
		</div>
	)
}
