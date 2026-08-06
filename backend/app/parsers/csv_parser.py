import csv

from app.parsers.base_parser import BaseParser


class CSVParser(BaseParser):

    def parse(self, file_path: str):

        events = []

        with open(
            file_path,
            newline="",
            encoding="utf-8"
        ) as csv_file:

            reader = csv.DictReader(csv_file)

            for row in reader:
                events.append(row)

        return events