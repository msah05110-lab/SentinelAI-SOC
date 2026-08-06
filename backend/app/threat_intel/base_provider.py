from abc import ABC, abstractmethod


class BaseThreatProvider(ABC):
    """
    Base class for all threat intelligence providers.
    """

    @abstractmethod
    def lookup(self, indicator: str):
        """
        Lookup an IOC.
        """
        pass