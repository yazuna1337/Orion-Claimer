import time
from colorama import Fore, Style

type_colors = {
	"INFO": Fore.LIGHTBLUE_EX,
	"ERROR": Fore.LIGHTRED_EX,
	"WARNING": Fore.LIGHTYELLOW_EX,
	"DEBUG": Fore.LIGHTBLUE_EX
}

class Logger():

	
	# Define types Colors
	@staticmethod
	def log(message: str, type="INFO"):
		# Get time including seconds and milliseconds and nanoseconds
		milliseconds = int(round(time.time() * 1000))
		formatted_time = time.strftime("%H:%M:%S", time.localtime(milliseconds / 1000)) + f".{milliseconds % 100000}"
		
		# Parse colors
		message = Logger.parse_colors(message)

		# Print message
		print(f"{Fore.LIGHTBLACK_EX}[{type_colors[type]}{type}{Fore.LIGHTBLACK_EX}] {Fore.LIGHTYELLOW_EX}-> {Style.RESET_ALL}{message} {Fore.LIGHTWHITE_EX}| {Fore.LIGHTYELLOW_EX}{formatted_time}")

	@staticmethod
	def input(message: str):
		milliseconds = int(round(time.time() * 1000))
		formatted_time = time.strftime("%H:%M:%S", time.localtime(milliseconds / 1000)) + f".{milliseconds % 100000}"

		message = Logger.parse_colors(message)

		return input(f"{Fore.LIGHTBLACK_EX}[{Fore.LIGHTYELLOW_EX}INPUT{Fore.LIGHTBLACK_EX}] {Fore.LIGHTYELLOW_EX}-> {Style.RESET_ALL}{message} {Fore.LIGHTWHITE_EX} {Fore.LIGHTBLACK_EX}=> {Style.RESET_ALL}")

	def parse_colors(message: str):
		# First parse all the LIGHT colors
		message = message.replace("LIGHTBLACK_EX", Fore.LIGHTBLACK_EX)
		message = message.replace("LIGHTBLUE_EX", Fore.LIGHTBLUE_EX)
		message = message.replace("LIGHTCYAN_EX", Fore.LIGHTCYAN_EX)
		message = message.replace("LIGHTGREEN_EX", Fore.LIGHTGREEN_EX)
		message = message.replace("LIGHTMAGENTA_EX", Fore.LIGHTMAGENTA_EX)
		message = message.replace("LIGHTRED_EX", Fore.LIGHTRED_EX)
		message = message.replace("LIGHTWHITE_EX", Fore.LIGHTWHITE_EX)
		message = message.replace("LIGHTYELLOW_EX", Fore.LIGHTYELLOW_EX)

		# Then parse all the other colors
		for color in Fore.__dict__:
			if color.startswith("__"):
				continue

			message = message.replace(color, Fore.__dict__[color])
		

		return message
