from app.parsers.csv_parser import CSVParser
from app.parsers.json_parser import JSONParser


class ParserFactory:

    @staticmethod
    def get_parser(extension: str):

        extension = extension.lower()

        if extension == "csv":
            return CSVParser()

        elif extension == "json":
            return JSONParser()

        else:
            raise ValueError(
                f"No parser available for: {extension}"
            )